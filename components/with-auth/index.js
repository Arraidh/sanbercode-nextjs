export function withAuth(Component) {
  return function WithAuth(props) {
    const isLogin = true;
    if (!isLogin) return <div>Login dulu bang</div>;

    return <Component {...props} />;
  };
}
