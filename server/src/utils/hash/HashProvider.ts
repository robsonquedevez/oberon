import { hash, compare } from 'bcryptjs';

interface IHash {
    payload: string;
}

interface ICompare {
    payload: string;
    hashed: string;
}

class HashProvider {

    public static async generateHash({ payload }: IHash): Promise<string> {
        return await hash(payload, 12);
    }

    public static async compareHash({ payload, hashed }: ICompare): Promise<boolean> {
        return await compare(payload, hashed);
    }

}

export default HashProvider;