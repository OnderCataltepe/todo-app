export const getFetch = async (url)=>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("something went wrong!");
    };
    return await response.json();
};

export const deleteFetch = async(data)=>{
    const response = await fetch(`http://localhost:3004/${data.name}/`+data.id, { method: "DELETE"});
    if(!response.ok){
        throw new Error("something went wrong!");
    };
    return data.id;
};

export const deleteCompletedFetch = (data)=>{
   data.forEach( async (element) => {
        const response = await fetch(`http://localhost:3004/todos/`+element.id, { method: "DELETE"});
        if(!response.ok){
            throw new Error("something went wrong!");
        };
    });
};

export const postFetch = async (data) =>{
    const response = await fetch(`http://localhost:3004/${data.name}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    if(!response.ok){
        throw new Error("Failed to add!");
    };

    return await response.json();
};

export const patchFetch = async(data)=>{
    const response = await fetch("http://localhost:3004/todos/"+data.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({completed: !data.completed})
    });
    if(!response.ok){
        throw new Error("Failed to add!");
    }
    return await response.json();
};

export const patchTitleFetch = async(data)=>{
    const response = await fetch("http://localhost:3004/todos/"+data.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({title: data.title})
    });
    if(!response.ok){
        throw new Error("Failed to add!");
    }
    return await response.json();
};

