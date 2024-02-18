export const formatDate = (d) => {
    const dateWrapper = new Date(d);

    return `${dateWrapper.getMonth() + 1}/${dateWrapper.getDate()}/${dateWrapper.getFullYear()}`
}