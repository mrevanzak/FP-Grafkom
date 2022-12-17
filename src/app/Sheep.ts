import { Group, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Sheep {
  public mesh: Group;
  
  constructor() {
    this.mesh = new Group();
    const gltf = new GLTFLoader();
    gltf.load("/models/sheep/scene.gltf", (gltf) => {
      const root = gltf.scene;
      root.scale.set(50, 50, 50);

      for (let i = 0; i < 100; i++) {
        const sheep = root.clone();
        sheep.position.set(
          (Math.random() - 0.5) * 40,
          0.5,
          (Math.random() - 0.5) * 40
        );
        sheep.rotation.set(0, Math.random() * Math.PI * 2, 0);
        this.mesh.add(sheep);
      }
    });
  }

  public animate(predator1: Group, predator2: Group) {
    let y = 0;
    for (let i = 0; i < this.mesh.children.length; i++) {
      y += 0.2;
      this.mesh.children[i].position.y = Math.sin(y) / 40;
      
      if (this.mesh.children[i].position.z > 26) {
        this.mesh.children[i].position.z = 25.5;
      }
      if (this.mesh.children[i].position.z < -24.5) {
        this.mesh.children[i].position.z = -24;
      }
      if (this.mesh.children[i].position.x > 25.4) {
        this.mesh.children[i].position.x = 25;
      }
      if (this.mesh.children[i].position.x < -25) {
        this.mesh.children[i].position.x = -24.5;
      }

      this.predatorInteraction(predator1, i);
      this.predatorInteraction(predator2, i);
    }
  }

  private distance( A: Group, B: Object3D){
				return Math.pow(Math.pow((A.position.x - B.position.x),2) + Math.pow((A.position.z - B.position.z),2),0.5)
			}

  public predatorInteraction(predator: Group, i: number) {
    if (this.distance(predator, this.mesh.children[i]) < 4.5) {
      this.mesh.children[i].position.x += (this.mesh.children[i].position.x - predator.position.x) / 30;
      this.mesh.children[i].position.z += (this.mesh.children[i].position.z - predator.position.z) / 30;
    }

    if (this.distance(predator, this.mesh.children[i]) < 1.5) {
      this.mesh.children[i].position.x += (this.mesh.children[i].position.x - predator.position.x) / 9;
      this.mesh.children[i].position.z += (this.mesh.children[i].position.z - predator.position.z) / 9;
    }

    if (this.distance(predator, this.mesh.children[i]) < 16.5) {
      this.mesh.children[i].position.x += (this.mesh.children[i].position.x - predator.position.x) / 300;
      this.mesh.children[i].position.z += (this.mesh.children[i].position.z - predator.position.z) / 300;
    }
  
  }
}
