import { Schema, model, Document, Types } from 'mongoose';

export interface ICharacter extends Document {
    name: string;
    description: string;
    species: string;
    isSleeping: boolean;
    bestFriend?: Types.ObjectId;
}

const characterSchema = new Schema<ICharacter>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    species: { type: String, required: true },
    isSleeping: { type: Boolean, required: true },
    bestFriend: { type: Schema.Types.ObjectId, ref: 'Character', required: false },
});

export const Character = model<ICharacter>('Character', characterSchema);