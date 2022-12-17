import { Group, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export class Border {
  private border1 = new Group();
  private border2 = new Group();
  private border3 = new Group();
  private border4 = new Group();
  private scene: Scene;

  constructor(scene: Scene) {
    this.loadTexture();
    this.scene = scene;
  }

  private loadTexture() {
    const loader = new GLTFLoader();
    loader.load("models/fence_wood/scene.gltf", (gltf) => {
      const root = gltf.scene;

      let z = 0;
      for (let i = 0; i < 12; i++) {
        z += 1.4;
        // 0.65
        const border = clone(root);
        border.position.set(0, 0, z);
        border.castShadow = true;
        this.border1.add(border);

        const border2 = clone(root);
        border2.position.set(0, 0, z);
        border2.castShadow = true;
        this.border2.add(border2);

        const border3 = clone(root);
        border3.position.set(0, 0, z);
        border3.castShadow = true;
        this.border3.add(border3);

        const border4 = clone(root);
        border4.position.set(0, 0, z);
        border4.castShadow = true;
        this.border4.add(border4);
      }
      //   this.border1.add(root);
    });
  }

  public placeBorder() {
    // this.border1.position.set(-27.6, 0, 25.25);

    this.border1.position.set(-25, 0, 26);
    this.border1.scale.set(3, 3, 3);
    this.border1.rotation.y = Math.PI / 2;
    this.scene.add(this.border1);

    // this.border2.position.set(26, 0, 27);
    
    this.border2.position.set(25.4, 0, 26);
    this.border2.scale.set(3, 3, 3);
    this.border2.rotation.y = Math.PI;
    this.scene.add(this.border2);

    // // this.border3.position.set(27.6, 0, -26);

    this.border3.position.set(25, 0, -26);
    this.border3.scale.set(3, 3, 3);
    this.border3.rotation.y = -Math.PI / 2;
    this.scene.add(this.border3);

    // // this.border4.position.set(-26, 0, -28);

    this.border4.position.set(-25.4, 0, -26);
    this.border4.scale.set(3, 3, 3);
    this.border4.rotation.y = 0;
    this.scene.add(this.border4);
  }
}

// // First, create a fence model using any 3D modeling software and export it as a .OBJ file

// // Load the .OBJ file using the OBJLoader provided by three.js
// const objLoader = new THREE.OBJLoader();
// objLoader.load('fence.obj', (object) => {
//   // Create a border1 for the fence model
//   const fence = new THREE.border1(object.children[0].geometry, material);

//   // Position the fence model on the ground plane
//   fence.position.set(0, 0, 0);

//   // Add the fence model to the scene
//   scene.add(fence);

//   // Create copies of the fence model using the clone method
//   const fence2 = fence.clone();
//   fence2.position.set(5, 0, 0);  // Adjust the position so that the fences overlap correctly
//   scene.add(fence2);

//   const fence3 = fence.clone();
//   fence3.position.set(10, 0, 0);  // Adjust the position so that the fences overlap correctly
//   scene.add(fence3);
// });

// First, create a fence model using any 3D modeling software and export it as a .OBJ file

// Create a ground plane using a PlaneGeometry object
// const ground = new THREE.border1(new THREE.PlaneGeometry(100, 100), material);
// ground.rotation.x = -Math.PI / 2;  // Rotate the ground plane to lie flat on the xz plane
// scene.add(ground);

// // Load the .OBJ file for the fence model using the OBJLoader
// const objLoader = new THREE.OBJLoader();
// objLoader.load('fence.obj', (object) => {
//   // Create a border1 for the fence model
//   const fence = new THREE.border1(object.children[0].geometry, material);

//   // Position the fence model on the ground plane
//   fence.position.set(0, 0, 0);

//   // Add the fence model to the scene
//   scene.add(fence);

//   // Use the wrapAround function to create copies of the fence model along the x and z axes
//   const boundingBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 0, 20));
//   fence.wrapAround(boundingBox, ground);
// });
