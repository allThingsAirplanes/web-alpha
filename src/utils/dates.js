export const formatDate = (d) => {
    const dateWrapper = new Date(d);

    return `${dateWrapper.getDate()}/${dateWrapper.getMonth() + 1}/${dateWrapper.getFullYear()}`
}