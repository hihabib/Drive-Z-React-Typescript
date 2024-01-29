import {signal} from "@preact/signals-react";
import {TUser} from "../types/user.ts";
import {TStructure} from "../types/structure.ts";

export const userSignal = signal<TUser | null>(null)
export const structureSignal = signal<TStructure | null>(null)
