export function toPromise(ctx, func, ...args) {
  return new Promise((resolve, reject) => {
    args.push((err, res)=> {
      if (err) reject(err);
      else resolve(res);
    });
    func.apply(ctx, args);
  });
}