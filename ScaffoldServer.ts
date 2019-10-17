/*
 * =========================================================
 * =========================================================
 * ScaffoldServer.ts
 * Written by Duncan Sparks for the UCI VGDC server
 * =========================================================
 * =========================================================
 */

import { Client, Message } from "discord.js";

export class ScaffoldServer {
	private serverName: string;

	public constructor(serverName: string) {
		this.serverName = serverName;
	}
}