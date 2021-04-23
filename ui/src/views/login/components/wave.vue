<template>
  <div id="wave" class="wave" />
</template>
<script>
import THREE from '../../../assets/js/three.min'
// const THREE = require('../../../assets/js/three.min.js')
// window.THREE = require('../../../assets/js/three.min.js')

export default {
  name: 'LoginWaveVue',
  mounted() {
    this.createWave()
  },
  methods: {
    createWave() {
      /* eslint-disable */
      var SEPARATION = 100
      var AMOUNTX = 100
      var AMOUNTY = 70

      var container
      var camera, scene, renderer

      var particles; var particle; var count = 0

      var mouseX = 85
      // var mouseX = 360
      var mouseY = -342
      // var mouseY = -142

      var windowHalfX = window.innerWidth / 2
      var windowHalfY = window.innerHeight / 2

      init()
      animate()

      function init() {
        container = document.getElementById('wave')
        // document.body.appendChild(container)

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
        camera.position.z = 1000

        scene = new THREE.Scene()

        particles = new Array()

        var PI2 = Math.PI * 2
        var material = new THREE.ParticleCanvasMaterial({

          color: 0xFFFFFF,
          // color: 0xCCCCCC,
          program: function(context) {
            context.beginPath()
            context.arc(0, 0, 0.6, 0, PI2, true)
            context.fill()
          }

        })

        var i = 0

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material)
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
            scene.add(particle)
          }
        }

        renderer = new THREE.CanvasRenderer()
        // renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setSize(window.innerWidth, window.innerHeight * 0.6)
        container.appendChild(renderer.domElement)

        // document.addEventListener('mousemove', onDocumentMouseMove, false)
        // document.addEventListener('touchstart', onDocumentTouchStart, false);
        // document.addEventListener('touchmove', onDocumentTouchMove, false)

        //

        window.addEventListener('resize', onWindowResize, false)
      }

      function onWindowResize() {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      //

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY * 2
      }

      function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
          event.preventDefault()

          mouseX = event.touches[0].pageX - windowHalfX
          mouseY = event.touches[0].pageY - windowHalfY * 2
        }
      }

      function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
          event.preventDefault()

          mouseX = event.touches[0].pageX - windowHalfX
          mouseY = event.touches[0].pageY - windowHalfY * 2
        }
      }

      //

      function animate() {
        requestAnimationFrame(animate)

        render()
      }

      function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y += (-mouseY - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        var i = 0

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++]
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
          }
        }

        renderer.render(scene, camera)

        count += 0.1
      }
    }
  }
}
</script>

<style scoped>
  .wave {
    /*position: fixed;*/
    position: absolute;
    /*top: 0;*/
    bottom: 0;
    left: 0;
    z-index: -1;
  }
</style>
