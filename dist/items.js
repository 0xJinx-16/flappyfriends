/** Base units stay exact; no balance passes through Number. */
export function formatGameItemQuantity(item, quantity) {
    const places = item.token?.decimals ?? 0;
    if (typeof quantity !== "bigint" || quantity < 0n || quantity >= 1n << 256n)
        throw new RangeError("Quantity must fit uint256.");
    if (!Number.isInteger(places) || places < 0 || places > 255)
        throw new RangeError("Decimals must be from 0 through 255.");
    if (places === 0)
        return quantity.toString();
    const digits = quantity.toString().padStart(places + 1, "0");
    const fraction = digits.slice(-places).replace(/0+$/, "");
    return `${digits.slice(0, -places)}${fraction ? `.${fraction}` : ""}`;
}
