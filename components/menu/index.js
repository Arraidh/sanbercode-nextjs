export default function Menu() {
  return (
    <div className="flex gap-4 items-center text-black">
      <a href="/" className="text-sm font-bold ">
        Home
      </a>
      <a href="/profile" className="text-sm font-bold ">
        Profile
      </a>
      <a href="/chess-gm" className="text-sm font-bold ">
        Chess GM
      </a>
      <a href="/notes" className="text-sm font-bold ">
        Notes
      </a>
    </div>
  );
}
