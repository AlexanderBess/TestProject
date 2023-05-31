import Vue from 'vue';
import moment from 'moment';
// import VueTippy, { TippyComponent } from 'vue-tippy';
// // import heic2any from 'heic2any';
// // import modals from '~/store/modals/modals';
// // import { images } from '~/utils/images';
//
// Vue.use(VueTippy);
// Vue.component('tippy', TippyComponent);

Vue.mixin({
  methods: {
    // async HEICConvertTo(file, toType = 'images/jpeg') {
    //   try {
    //     return await heic2any({
    //       blob: file,
    //       toType,
    //     });
    //   } catch (e) {
    //     console.error('main/heicConvert', e);
    //     return null;
    //   }
    // },
    EqualsArrays(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
      return true;
    },
    async uploadFiles(files) {
      if (!files.length) return [];
      const fetchData = [];
      const fetchUrlsData = [];
      const medias = [];
      for (let i = 0; i < files.length; i += 1) {
        let { file } = files[i];
        if (file?.type === 'images/heic') {
          // eslint-disable-next-line no-await-in-loop
          file = await this.HEICConvertTo(file);
          files[i] = file;
        }
        if (files[i].mediaId) medias.push(files[i].mediaId);
        else fetchData.push(this.$store.dispatch('user/getUploadFileLink', { contentType: file?.type }));
      }
      if (!fetchData.length) return medias;
      const urls = await Promise.all(fetchData);
      for (let i = 0; i < files.length; i += 1) {
        const { file } = files[i];
        const { mediaId, url } = urls[i];
        medias.push(mediaId);
        if (file) {
          fetchUrlsData.push(this.$store.dispatch('user/uploadFile', {
            url,
            data: file,
            contentType: file.type,
          }));
        }
      }
      await Promise.all(fetchUrlsData);
      return medias;
    },
    // ShowModal(payload) {
    //   this.$store.dispatch('modals/show', {
    //     key: modals.default,
    //     ...payload,
    //   });
    // },
    /**
     * Set loader params
     * @param payload - boolean || { isLoading, statusText, loaderMode, loaderProgress, isHiderBackground }
     * @constructor
     */
    SetLoader(payload) {
      this.$store.dispatch('main/setLoading', payload);
    },
    CloseModal() {
      this.$store.dispatch('modals/hide');
    },
    ClipboardSuccessHandler(value) {
      this.$store.dispatch('main/showToast', {
        title: 'Copied successfully',
        text: value,
      });
    },
    ClipboardErrorHandler(value) {
      this.$store.dispatch('main/showToast', {
        title: 'Copy error',
        text: value,
      });
    },
    ShowToast(text, title = null) {
      this.$bvToast.toast(text, {
        title: title || this.$t('modals.errors.error'),
        variant: 'warning',
        solid: true,
        toaster: 'b-toaster-bottom-right',
        appendToast: true,
        toastClass: 'custom-toast-width',
        bodyClass: 'custom-toast-width',
      });
    },

    GetFormTimestamp(timestamp, format = 'DD.MM.YY H:mm') {
      if (timestamp !== 0 && timestamp !== '-' && timestamp !== '' && timestamp !== undefined) {
        // timestamp = +timestamp * 1000;
        timestamp = +timestamp;
        return moment(new Date(timestamp)).format(format);
      }
      return '-';
    },

    CropTxt(str, maxLength) {
      if (str.length > maxLength) str = `${str.slice(0, maxLength)}...`;
      return str;
    },
    CutTxn(txn, first = 10, second = 10) {
      if (txn?.length > first + second) return `${txn.slice(0, first)}...${txn.slice(-second)}`;
      return txn;
    },

    UserName(firstName, lastName) {
      if (firstName || lastName) return `${firstName || ''} ${lastName || ''}`;
      return this.$t('profile.defaultName');
    },
    NumberWithSpaces(value) {
      if (!value) return '';
      const parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
    SetDelay(func, timeout, delayId) {
      clearTimeout(delayId);
      return setTimeout(func, timeout);
    },
    ScrollToTop: () => window.scrollTo(0, 0),
    // ShowModalSuccess({
    //   title, subtitle, img, path, link,
    // }) {
    //   this.ShowModal({
    //     key: modals.status,
    //     img: img || images.SUCCESS,
    //     title: title || this.$t('meta.success'),
    //     subtitle,
    //     link,
    //     path,
    //   });
    // },
    // ShowModalFail({
    //   title, subtitle, img, path,
    // }) {
    //   this.ShowModal({
    //     key: modals.status,
    //     img: img || images.WARNING,
    //     title: title || this.$t('meta.fail'),
    //     subtitle,
    //     path,
    //   });
    // },
    checkIfMobile() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
        /Opera Mini/i,
      ];

      return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
    },
  },
});
