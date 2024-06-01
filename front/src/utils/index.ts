declare global {
    interface String {
      toCapitalized(): string;
      toTitleCase(): string;
    }
}

export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export const readFilesAsBase64 = (selectedFiles: FileList | null): Promise<string[]> => {
	const base64Promises: Promise<string>[] = [];
  
	if (!!selectedFiles && selectedFiles.length > 0) {
	  Array.from(selectedFiles).forEach((file: File) => {
		const reader = new FileReader();
		const promise: Promise<string> = new Promise((resolve) => {
		  reader.onload = () => {
			const base64 = reader.result as string;
			resolve(base64);
		  };
		});
  
		reader.readAsDataURL(file);
		base64Promises.push(promise);
	  });
	}
  
	return Promise.all(base64Promises);
};