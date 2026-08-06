const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      // BLINDAGEM: Intercepta o bloqueio de anti-spam do Laravel
      if (response.status === 429) {
        throw new Error('Muitas pesquisas seguidas! Aguarde 1 minuto para buscar novamente. 🕒');
      }

      if (!response.ok) {
        throw new Error(`Erro do servidor: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro na requisição GET ${endpoint}:`, error);
      throw new Error(error.message || 'Falha na comunicação com o servidor.');
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // BLINDAGEM: Intercepta o anti-spam no envio de reviews também
      if (response.status === 429) {
        throw new Error('Muitas avaliações enviadas! Dê um tempo para os seus ouvidos e tente novamente em 1 minuto. 🎧');
      }

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 422 && responseData?.errors) {
          const firstError = Object.values(responseData.errors)[0][0];
          throw new Error(firstError);
        }
        
        throw new Error(responseData?.error || responseData?.message || 'Erro inesperado ao conectar com o servidor.');
      }

      return responseData;
    } catch (error) {
      console.error(`Erro na requisição POST ${endpoint}:`, error);
      throw error; 
    }
  }
};

export default api;