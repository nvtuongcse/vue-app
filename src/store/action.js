/* eslint-disable */
import axios from "axios";

export default {
  async signUp({ state }, { email, password, router, ls, toast }) {
    try {
      const res = await axios.post("http://localhost:3000/graphql", {
        query: `mutation{
            guestMutation{signUp(record: {
            email: "${email}",
            password: "${password}"
            })
          }
        }`
      });
      if(!res.data.data.guestMutation.signUp){
        toast.error(res.data.errors[0].message);
        return;
      }
      const token = res.data.data.guestMutation.signUp.token
      state.user = {
        token
      };
      ls.set("user", state.user);
      router.push("./account");
    } catch (error) {
      toast.error(error.message);
    }
  },
  async signIn({ state }, { email, password, router, ls, toast }) {
    try {
      const res = await axios.post("http://localhost:3000/graphql", {
        query: `mutation{
            guestMutation{signIn(
            email: "${email}",
            password: "${password}"
            )
          }
        }`
      });
      
      if (!res.data.data.guestMutation.signIn) {
        toast.error(res.data.errors[0].message);
        return;
      }
      const token = res.data.data.guestMutation.signIn.token;
      state.user = {
        token
      };
      ls.set("user", state.user);
      router.push("./account");
    } catch (error) {
      toast.error(error.message);
    }
  },
  async updateProfile({ state }, { record, router, ls, toast, token }) {
    try {
      const { name, fullName, decription } = record;
      const res = await axios.post(
        "http://localhost:3000/graphql",
        {
          query: `mutation{ userMutation{ profileUpdateOne(record: { name: "${name}" fullName: "${fullName}" decription: "${decription}" }){ recordId } }}`
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: state.user.token
          }
        }
      );
      if (res.data.data.userMutation.profileUpdateOne.recordId) {
        toast.success("Update Successfully!");
        return;
      }

      toast.error(res.data.errors[0].message);
    } catch (error) {
      toast.error(error.message);
    }
  }
};
