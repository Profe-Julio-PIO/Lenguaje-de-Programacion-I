async function getUser(id){
    const res = await fetch(`https://reqres.in/api/users/${id}`)
    const data = await res.json();
    return data.data;
}

async function UserPage({params}){
    const user = await getUser(params.id);

    return <div className="bg-slate-400 p-10 rounded-md">
        <img src={user.avatar} alt="" className="m-auto my-4"/>
        <h3 className="text-3xl font-bold">{user.id}. {user.first_name} {user.last_name}</h3>
        <p>Email: {user.email}</p>
    </div>;
}

export default UserPage;