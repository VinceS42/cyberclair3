import { poppins } from '@/app/components/fonts';

export default function LoginForm({}) {
    return (
        <div className={`${poppins.className} antialiased flex justify-center items-center min-h-screen bg-black`}>
            <div className="w-[420px] text-white bg-blue-800">
                <form action="">
                    <h1 className="text-center">Login</h1>
                    <div>
                        <input type="text" placeholder="Email" />
                    </div>
                    <div>
                        <input type="text" placeholder="Password" />
                    </div>
                    <div>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Rember me</label>
                        <a href="#">Forget password</a>
                    </div>

                    <button type="submit">Login</button>

                    <div>
                        <a href="#">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
