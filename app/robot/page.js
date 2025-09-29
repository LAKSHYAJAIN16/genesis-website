import Robot from '../../components/Robot';

export default function RobotPage() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">3D Robot</h1>
        <p className="text-gray-600">Move your cursor around to see the robot's head follow it!</p>
      </div>
      <Robot />
    </div>
  );
}
