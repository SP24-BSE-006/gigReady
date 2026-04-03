function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">GigReady</h1>
      <div className="flex gap-4">
        <button className="text-gray-600 hover:text-blue-600 font-medium">
          Login
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar