export default function CardSkeleton() {
    return (
        <div className="h-5 w-5 space-y-5 border rounded-xl bg-gray-200">
            <div className="flex flex-col">
                <div className="flex gap-4 text-white"></div>
            </div>
        </div>
    );
}
