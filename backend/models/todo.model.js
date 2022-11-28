module.exports = (mongoose, mongoosePaginate) => {
    /**
     * Todo schema
     */
    const schema = mongoose.Schema(
        {
            name: String,
            done: Boolean,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.plugin(mongoosePaginate);
    return mongoose.model("Todo", schema);
};