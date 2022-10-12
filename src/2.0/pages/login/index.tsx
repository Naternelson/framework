export const LoginPage = () => {
    return <div className="page">
        <h1>Insert LOGIN PAGE here</h1>
        <form action="#">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password"/>
            </div>
            <div className="form-group"><button>Login</button></div>
        </form>
    </div>
        
}