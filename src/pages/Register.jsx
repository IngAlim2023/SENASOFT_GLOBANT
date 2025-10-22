import { useForm } from "react-hook-form";
import supabase from "../api/supabase";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    const {error} = await supabase.auth.signUp(data)

    if(error){
        return toast.error('Vuelve a intentarlo')
    }
    toast.success('Revisa tu correo')
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="email" {...register('email',{required:true})} />
        <input type="password" placeholder="password" {...register('password',{required:true})} />
        <button className="rounded-sm bg-emerald-600 p-2 text-white">registrame</button>
      </form>
    </div>
  );
};

export default Register;
