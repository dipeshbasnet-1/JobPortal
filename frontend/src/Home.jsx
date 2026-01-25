import React, { useState } from "react";

const Home = () => {
    const [count, setCount] = useState(0);
    
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
            useState Example
        </h1>
        
        <p className="mb-4">
            Count: {count}
        </p>
        
        <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        >
            Increase
        </button>
    </div>
    );
};

export default Home;
