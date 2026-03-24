import { Schema, model, Document, Types } from 'mongoose';

export interface IArtifact extends Document {
    name: string;
    description: string;
    owner: Types.ObjectId;
}

const artifactSchema = new Schema<IArtifact>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
});

export const Artifact = model<IArtifact>('Artifact', artifactSchema);