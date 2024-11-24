import * as THREE from 'three';

// Luodaan näkymä ja renderer
const div = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, div.offsetWidth / div.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(div.offsetWidth, div.offsetHeight);
div.appendChild(renderer.domElement);

// Kuution geometria ja materiaali
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Maapallon geometria ja materiaali
const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('beautiful-glowing-gray-full-moon-removebg-preview.png');
const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
earth.position.x = 3; // Asetetaan maapallo kuution viereen
scene.add(earth);

// Valot
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Kamera-asetukset
camera.position.z = 5;

// Animaatio
function animate() {
    requestAnimationFrame(animate);

    // Animoidaan kuutiota
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Pyöritetään maapalloa
    earth.rotation.y += 0.005;

    // Renderöidään näkymä
    renderer.render(scene, camera);
}

animate();

// Responsiivisuus
window.addEventListener('resize', () => {
    camera.aspect = div.offsetWidth / div.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(div.offsetWidth, div.offsetHeight);
});
