export function env(key:string, word?: string) {
    word = word??'default';
    const response=process.env['REACT_APP_'+key]??word;
    return response;
}