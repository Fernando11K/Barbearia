const formataDDMMYYYYHHmmParaDate = (data: string): Date | null => {
    const match = data.match(/\d+/g);
    if (!match) {
        return null;
    }
    const [dia, mes, ano] = match

    return new Date(`${ano}/${mes}/${dia}`);
}

export { formataDDMMYYYYHHmmParaDate };