import { Subject } from 'rxjs';

export interface IStorage {
	upload(file: File): Subject<any>;
	remove(path): Promise<void>;
}