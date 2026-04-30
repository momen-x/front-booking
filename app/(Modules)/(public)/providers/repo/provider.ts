import Provider from "../entities/provider";
import { TUpdateProvider } from '../dto/update-provider';

interface IProviderApi {
    getAll: () => Promise<Provider[]>;
    getById: (id: string) => Promise<Provider>;
    update: (id:string, data: TUpdateProvider) => Promise<Provider>;
    delete: (id: string) => Promise<Provider>;
}

export default IProviderApi;