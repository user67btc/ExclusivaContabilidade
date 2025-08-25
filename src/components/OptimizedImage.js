import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

/**
 * OptimizedImage - Componente de imagem otimizado com:
 * - Carregamento lazy inteligente
 * - Blur/placeholder durante carregamento
 * - Detecção de visibilidade para carregamento prioritário
 * - Suporte a formatos modernos (WebP)
 * - Animação fade-in ao carregar
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.src - URL da imagem
 * @param {number} props.width - Largura da imagem
 * @param {number} props.height - Altura da imagem
 * @param {string} props.alt - Texto alternativo para acessibilidade
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {string} [props.style] - Estilos inline
 * @param {number} [props.quality=75] - Qualidade da imagem (1-100)
 * @param {boolean} [props.priority=false] - Carrega com prioridade alta
 * @param {string} [props.objectFit="cover"] - Modo de ajuste da imagem
 * @param {boolean} [props.disableAnimation=false] - Desativa animação de entrada
 * @param {boolean} [props.disablePlaceholder=false] - Desativa placeholder blur
 */
const OptimizedImage = ({
  src,
  width,
  height,
  alt,
  className = "",
  style = {},
  quality = 75,
  priority = false,
  objectFit = "cover",
  disableAnimation = false,
  disablePlaceholder = false,
  onLoad,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Determinar se a imagem deve ser carregada com prioridade
  const shouldPrioritize = priority || inView;
  
  // Gerar um placeholder de baixa qualidade (base64)
  const blurDataURL = disablePlaceholder ? undefined : 
    `data:image/svg+xml;base64,${btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <filter id="b" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="20"/>
        </filter>
        <rect width="100%" height="100%" x="0" y="0" fill="#f0f0f0" filter="url(#b)"/>
      </svg>`
    )}`;

  // Classes condicionais para animação
  const imageClasses = [
    className,
    !disableAnimation && "transition-opacity duration-500",
    !disableAnimation && isLoaded ? "opacity-100" : "opacity-0"
  ].filter(Boolean).join(" ");
  
  // Detectar quando a imagem é carregada completamente
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };
  
  // Filtrar props que não devem ser passados para o elemento DOM
  const { placeholderType, ...imageProps } = restProps;
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${!disableAnimation && !isLoaded ? 'bg-gray-100' : ''}`}
      style={{ width, height, ...style }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={imageClasses}
        {...(shouldPrioritize ? { priority: true } : { loading: "lazy" })}
        placeholder={disablePlaceholder ? "empty" : "blur"}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        style={{ objectFit }}
        {...imageProps}
      />
    </div>
  );
};

export default React.memo(OptimizedImage);
