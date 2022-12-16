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

  constructor(scene: Scene, width: number, height: number) {
    this.loadTexture();
    this.geometry = new PlaneGeometry(width, height);
    this.mesh = new Mesh(this.geometry, this.material);
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
