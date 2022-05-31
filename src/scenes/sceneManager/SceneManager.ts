import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";

export class SceneManager {
  private static app: Application;
  private static currentScene: IScene;
  private static _width: number;
  private static _height: number;
  public static get width(): number {
    return SceneManager._width;
  }
  public static get height(): number {
    return SceneManager._height;
  }

  public static initialize(
    width: number,
    height: number,
    background: number
  ): void {
    SceneManager._width = width;
    SceneManager._height = height;

    SceneManager.app = new Application({
      view: document.querySelector("canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width: width,
      height: height,
    });

    SceneManager.app.ticker.add(SceneManager.update);
  }

  public static changeScene(newScene: IScene): void {
    if (SceneManager.currentScene) {
      SceneManager.app.stage.removeChild(SceneManager.currentScene);
      SceneManager.currentScene.destroy();
    }

    SceneManager.currentScene = newScene;
    SceneManager.app.stage.addChild(SceneManager.currentScene);
  }

  private static update(framesPassed: number): void {
    if (SceneManager.currentScene) {
      SceneManager.currentScene.update(framesPassed);
    }
  }
}

export interface IScene extends DisplayObject {
  update(framesPassed: number): void;
}

export default SceneManager;
