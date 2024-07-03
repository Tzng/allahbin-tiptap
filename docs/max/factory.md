# 工厂模式介绍

我们使用单例的工厂模式来管理这个对象，示例代码如下：

> 这个key是用来区分不同渲染器的唯一标识，建议使用数据的唯一主键，如果是只有一个渲染器，渲染器有自己默认的唯一标识，那么可以不传这个参数。

```typescript
const tiptapRenderFactory = TiptapRenderFactory.getInstance();

export const jsonToDom = (key: string, json: ITiptapJson, config?: IRenderConfig) => {
  const renderInstance = tiptapRenderFactory.getRenderInstance(key, json, config);
  return renderInstance.render();
};

export const removeEditor = (key: string) => {
  tiptapRenderFactory.removeRenderInstance(key);
};
```

这样做的好处包括：

1. **灵活性**：通过在获取`TiptapRender`实例时同时传入`json`和`config`参数，您可以根据需要动态设置不同的数据和配置，使得每个实例可以独立进行渲染操作。

2. **简化操作**：将`json`和`config`参数传递到获取实例的方法中，可以简化对每个实例的设置过程，使得代码更加清晰和易于维护。

3. **性能优化**：每个实例都可以根据传入的`json`和`config`参数进行初始化和设置，避免出现不必要的重复代码和操作，从而提高性能和效率。

4. **一致性**：确保每个实例在渲染操作时都有正确的数据和配置，避免出现混乱或错误的渲染结果，保证渲染器的一致性和正确性。

总之，通过在获取`TiptapRender`实例时支持传入`json`和`config`参数，可以提高代码的灵活性、简化操作、优化性能，并确保渲染器实例的一致性和正确性。这样的设计可以更好地满足多渲染器场景下的需求。
