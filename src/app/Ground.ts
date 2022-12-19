import { Body, Box, Vec3 } from "cannon-es";
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  TextureLoader,
} from "three";

export class Ground {
  private material = new MeshBasicMaterial();
  private geometry: PlaneGeometry;
  public mesh: Mesh;
  public body: Body;

  constructor(scene: Scene, width: number, height: number) {
    this.loadTexture();
    this.geometry = new PlaneGeometry(width, height);
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.body = new Body({
      type: Body.STATIC,
      shape: new Box(new Vec3(width / 2, 5, height / 2)),
    });

    this.body.position.x = this.mesh.position.x;
    this.body.position.y = this.mesh.position.y - 5;
    this.body.position.z = this.mesh.position.z;

    scene.add(this.mesh);
  }

  private loadTexture() {
    const loader = new TextureLoader();
    loader.load("/models/grassmin.jpg", (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(40, 40);
      this.material.map = texture;
      this.material.needsUpdate = true;
    });
  }
}
