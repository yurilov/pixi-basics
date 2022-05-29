import { Container } from "pixi.js";
import { SceneManager } from "./Manager";

export class Scene extends Container
{
	protected _manager: SceneManager;

	public start(manager: SceneManager): void
	{
		this._manager = manager;
	}

	public update(delta: number): void
	{
		// empty
	}

	public stop(): void
	{
		this._manager = null;
	}
}
