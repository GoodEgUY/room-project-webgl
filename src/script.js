import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Импорт OrbitControls

const canvas = document.querySelector('.canvas');
const scene = new THREE.Scene();


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Добавляем освещение
const ambientLight = new THREE.AmbientLight(0x563453, 0.5); // Цвет, Интенсивность
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Цвет, Интенсивность
directionalLight.position.set(1, 1, 1); // Положение источника света
scene.add(directionalLight);

// Добавляем управление камерой с помощью OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

const loader = new GLTFLoader();
loader.load(
    'models/Room2/room.glb', // путь к вашей модели glTF
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

const tick = () => {
    
    const delta = clock.getDelta();
    
    // Добавьте свою логику анимации здесь, если необходимо
    
    controls.update(); // Обновляем управление камерой
    
    renderer.render(scene, camera);

    
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});
