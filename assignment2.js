import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';


const container = document.getElementById('container');
container.style.position = 'relative';
let renderer, stats, gui, scene, camera, controls;

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.update();

    // Load PLY files
    const loader = new PLYLoader();
    for (let i = 2; i <= 19; i++) {
        loader.load(`assets/assignment2/results/fountain-P11/point-clouds/cloud_${i}_view.ply`, function (geometry) {
            geometry.computeVertexNormals();
            const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });
            const points = new THREE.Points(geometry, material);
            scene.add(points);
        });
    }
}

function initSTATS() {
    stats = new Stats();
    stats.showPanel(0);
    container.appendChild(stats.dom);
}

function initGUI() {
    gui = new GUI({ autoPlace: false });
    container.appendChild(gui.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add the window resize event listener
window.addEventListener('resize', onWindowResize, false);

// Initialize everything
initScene();
initSTATS();
initGUI();
animate();
