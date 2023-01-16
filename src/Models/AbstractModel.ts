import { Schema, models, Model, model } from 'mongoose';

export default abstract class AbstractModel<T> {
  protected _model: Model<T>;
  protected _schema: Schema;
  protected _nameModel: string;

  constructor(schema: Schema, nameModel: string) {
    this._schema = schema;
    this._nameModel = nameModel;
    this._model = models[this._nameModel] || model(this._nameModel, this._schema); // verifica se existe uma collection antes de executar. Caso não exista, o schema será criado
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async find() {
    return this._model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }
}