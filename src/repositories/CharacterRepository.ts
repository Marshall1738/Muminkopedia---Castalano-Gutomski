import { Character, ICharacter } from '../models/Characters';

export class CharacterRepository {
    async findAll() {
        return await Character.find().populate('bestFriend');
    }

    async findById(id: string) {
        return await Character.findById(id).populate('bestFriend');
    }

    async create(data: Partial<ICharacter>) {
        const character = new Character(data);
        return await character.save();
    }

    async update(id: string, data: Partial<ICharacter>) {
        return await Character.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await Character.findByIdAndDelete(id);
    }
}