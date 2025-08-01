// src/components/Scene.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default function Scene({ onHit }) {
  const mountRef = useRef(null);
  const worldRef = useRef(null);
  const ballBodyRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a5fb4);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Physics World
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // Ground (court)
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ type: CANNON.Body.STATIC });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Court Visual
    const courtGeo = new THREE.PlaneGeometry(24, 11);
    const courtMat = new THREE.MeshStandardMaterial({ color: 0xdd2c00 });
    const court = new THREE.Mesh(courtGeo, courtMat);
    court.rotation.x = -Math.PI / 2;
    court.receiveShadow = true;
    scene.add(court);

    // Net
    const netGeo = new THREE.BoxGeometry(24, 1, 0.1);
    const netMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.set(0, 0.5, 0);
    scene.add(net);

    // Player
    const playerGeo = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const playerMat = new THREE.MeshStandardMaterial({ color: 0x3366ff });
    const player = new THREE.Mesh(playerGeo, playerMat);
    player.position.set(-8, 1, 0);
    player.castShadow = true;
    scene.add(player);

    // Ball
    const ballGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xf4f442 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.castShadow = true;
    scene.add(ball);

    // Cannon.js Ball Body
    const ballShape = new CANNON.Sphere(0.3);
    const ballBody = new CANNON.Body({ mass: 1, shape: ballShape, position: new CANNON.Vec3(0, 1, 4) });
    world.addBody(ballBody);
    ballBodyRef.current = ballBody;

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      world.step(1/60, delta);

      // Sync ball
      ball.position.copy(ballBody.position);
      ball.quaternion.copy(ballBody.quaternion);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle hit from App
    onHit = onHit || (() => {});
    window.hitTopspin = () => {
      ballBody.velocity.set(6, 8, -10); // Fast, high spin
      ballBody.angularVelocity.set(-15, 0, 0); // Topspin rotation
      onHit('topspin');
    };

    window.hitSlice = () => {
      ballBody.velocity.set(5, 4, -8); // Low, skidding
      ballBody.angularVelocity.set(10, 0, 0); // Backspin
      onHit('slice');
    };

    window.hitLob = () => {
      ballBody.velocity.set(3, 10, -6); // High arc
      ballBody.angularVelocity.set(-5, 0, 0); // Soft topspin
      onHit('lob');
    };

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onHit]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />;
}