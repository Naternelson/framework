export const SignupPage = () => {
    return <div className="page">
        <h1>Insert SIGNUP PAGE here</h1>
        <form action="#">
            <h2>Signup</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password"/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmation">Confirm</label>
                <input name="confirmation" id="confirmation" type="password"/>
            </div>
            <div className="form-group"><button>Signup</button></div>
        </form>
    </div>
        
}