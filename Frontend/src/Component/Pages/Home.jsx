export default function HospitalHome() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen transition">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Hospital</h2>
        <p className="max-w-2xl text-lg mb-8">
          Manage doctors, patients, medical records and appointments efficiently
          using our modern hospital management system.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg">
          Get Started
        </button>
      </section>
    </div>
  );
}
