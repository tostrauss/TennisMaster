import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { useEffect, useRef } from 'react';

export function TennisCourt({ playerPosition, ballPosition, onHit }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a5fb4); // Sky blue

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Hardcourt
    const courtGeometry = new THREE.PlaneGeometry(24, 12);
    const courtMaterial = new THREE.MeshStandardMaterial({ color: 0xd43636 }); // Red hardcourt
    const court = new THREE.Mesh(courtGeometry, courtMaterial);
    court.rotation.x = -Math.PI / 2;
    court.receiveShadow = true;
    scene.add(court);

    // Net
    const netGeometry = new THREE.BoxGeometry(24, 1, 0.1);
    const netMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const net = new THREE.Mesh(netGeometry, netMaterial);
    net.position.set(0, 0.5, 0);
    scene.add(net);

    // Ball
    const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f442 });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.castShadow = true;
    scene.add(ballMesh);

    // Player (simple cube for now)
    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff });
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    playerMesh.castShadow = true;
    scene.add(playerMesh);

    // Physics World
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    // Floor body
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Ball body
    const ballShape = new CANNON.Sphere(0.3);
    const ballBody = new CANNON.Body({ mass: 1, shape: ballShape });
    world.addBody(ballBody);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      world.step(1/60, delta);

      // Sync Three.js and Cannon.js
      ballMesh.position.copy(ballBody.position);
      playerMesh.position.set(playerPosition.x, 1, playerPosition.z);

      // Move ball if hit
      if (ballPosition) {
        ballBody.position.set(ballPosition.x, ballPosition.y, ballPosition.z);
        ballBody.velocity.set(0, 0, 0);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [playerPosition, ballPosition]);

  return <div ref={mountRef} className="absolute inset-0" />;
}