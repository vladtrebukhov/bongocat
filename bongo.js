const root = new Vue({
  el: '#root',
  mounted () {
    window.addEventListener('keydown', event => {
      if (event.key === ' ') {
        this.slapTheBongo();
        this.autoplayWarningSeen = !this.autoplayWarningSeen;
      } else if (event.key === '+') {
        this.videoSize += 10;
      } else if (event.key === '-') {
        this.videoSize -= 10;
      } else if (event.key === 'p') {
        const vid = this.$refs.bongocat;
        vid.paused ? vid.play() : vid.pause();
      } else if (event.key === 'f') {
        this.showFooter = !this.showFooter;
      }
      console.log(event.key);
    });

    this.slapTheBongo();
  },
  data: {
    endpoint: './endpoint.json',
    autoplayWarningSeen: false,
    bongocat: null,
    videoSize: 50,
    videoControls: true,
    showFooter: true,
    keys: [
      ['space', 'another video'],
      ['+', 'zoom in'],
      (2)[('-', 'zoom out')],
      ['p', 'play/pause'],
      ['f', 'toggle footer']
    ]
  },
  methods: {
    // HLS.js API to stream video from source
    slapTheBongo () {
      console.log('bongocat!');
      fetch(this.endpoint)
        .then(response => response.json())
        .then(data => {
          let bongocat = data[Math.floor(Math.random() * data.length)];
          console.log(bongocat);
          if (bongocat.type.S) {
            Vue.nextTick(() => {
              const video = document.getElementById('video');
              console.log(video);
              // const hls = new Hls();
              // hls.loadSource(bongocat.src.S);
              // hls.attachMedia(this.$refs.bongocat);

              // hls.on(Hls.Events.MANIFEST_PARSED, function () {
              //   video.play();
              // });
            });
          }
        })
        .catch(err => {
          console.error('wtf? m8', err);
        });
    }
  }
});
