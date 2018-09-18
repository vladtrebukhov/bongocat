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
    previousVideo: null,
    keys: [
      ['space', 'another video'],
      ['+', 'zoom in'],
      ['-', 'zoom out'],
      ['p', 'play/pause'],
      ['f', 'toggle footer']
    ]
  },
  methods: {
    slapTheBongo () {
      console.log('bongocat!');
      fetch(this.endpoint)
        .then(response => response.json())
        .then(data => {
          let bongocat = data[Math.floor(Math.random() * data.length)];
          console.log(bongocat);
          console.log(bongocat.type.S);
          if (bongocat) {
            Vue.nextTick(() => {
              const hls = new Hls();

              hls.loadSource(bongocat.src.S);
              hls.attachMedia(this.$refs.bongocat);

              hls.on(Hls.Events.MANIFEST_PARSED, function () {
                this.$refs.bongocat.play();
              });
            });
          }
        })
        .catch(err => {
          console.error('wtf? m8', err);
        });
    }
  }
});
