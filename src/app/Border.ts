import { Group, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Border {
  private border1 = new Group();
  private border2 = new Group();
  private border3 = new Group();
  private border4 = new Group();
  private fence1 = new Group();
  private fence2 = new Group();
  private fence3 = new Group();
  private fence4 = new Group();
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
        const border = root.clone();
        border.position.set(0, 0, z);
        border.castShadow = true;
        this.border1.add(border);

        const border2 = root.clone();
        border2.position.set(0, 0, z);
        border2.castShadow = true;
        this.border2.add(border2);

        const border3 = root.clone();
        border3.position.set(0, 0, z);
        border3.castShadow = true;
        this.border3.add(border3);

        const border4 = root.clone();
        border4.position.set(0, 0, z);
        border4.castShadow = true;
        this.border4.add(border4);
      }

      z = 0;
      for (let i = 0; i < 4; i++) {
        z += 1.4;
        const fence = root.clone();
        fence.position.set(0, 0, z);
        fence.castShadow = true;
        this.fence1.add(fence);

        const fence2 = root.clone();
        fence2.position.set(0, 0, z);
        fence2.castShadow = true;
        this.fence2.add(fence2);

        if (i > 2) continue;

        const fence3 = root.clone();
        fence3.position.set(0, 0, z);
        fence3.castShadow = true;
        this.fence3.add(fence3);

        const fence4 = root.clone();
        fence4.position.set(0, 0, z);
        fence4.castShadow = true;
        this.fence4.add(fence4);
      }
    });
  }

  public placeBorder() {
    this.border1.position.set(-25, 0, 26);
    this.border1.scale.set(3, 3, 3);
    this.border1.rotation.y = Math.PI / 2;
    this.scene.add(this.border1);

    this.border2.position.set(25.4, 0, 26);
    this.border2.scale.set(3, 3, 3);
    this.border2.rotation.y = Math.PI;
    this.scene.add(this.border2);

    this.border3.position.set(25.4, 0, -24.5);
    this.border3.scale.set(3, 3, 3);
    this.border3.rotation.y = -Math.PI / 2;
    this.scene.add(this.border3);

    this.border4.position.set(-25, 0, -24.5);
    this.border4.scale.set(3, 3, 3);
    this.border4.rotation.y = 0;
    this.scene.add(this.border4);

    this.fence1.position.set(-15, 0, 9);
    this.fence1.scale.set(3, 3, 3);
    this.scene.add(this.fence1);

    this.fence2.position.set(15, 0, 9);
    this.fence2.scale.set(3, 3, 3);
    this.scene.add(this.fence2);

    this.fence3.position.set(15, 0, 9);
    this.fence3.rotateY(-Math.PI / 2);
    this.fence3.scale.set(3, 3, 3);
    this.scene.add(this.fence3);

    this.fence4.position.set(-15, 0, 9);
    this.fence4.rotateY(Math.PI / 2);
    this.fence4.scale.set(3, 3, 3);
    this.scene.add(this.fence4);
  }
}
