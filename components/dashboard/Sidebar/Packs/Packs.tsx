
export default function Packs({ pack }: { pack: any }) {
    return (
        <div className="p-5 text-white border rounded-xl">
            <div className="my-4">
                <h2>{pack.name_pack}</h2>
            </div>
            <div className="my-4">
                <p>{pack.description}</p>
            </div>
            <div className="my-4">
                <p>{pack.price} €</p>
            </div>
            <button className="border my-4">Selectionner</button>
        </div>
    );
}
