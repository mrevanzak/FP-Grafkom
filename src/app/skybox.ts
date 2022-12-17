import { 
    Group,
} from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Skybox {
    public mesh: Group;
    private loader: GLTFLoader;

    constructor() {
        this.mesh = new Group();
        this.loader = new GLTFLoader();
        this.loader.load("/models/skybox/scene.gltf", (gltf) => {
            const root = gltf.scene;
            root.scale.set(1, 1, 1);
            this.mesh.add(root);
        });
    }
}
